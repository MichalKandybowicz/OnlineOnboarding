from django.core import mail
from django.core.mail import BadHeaderError
from django.contrib.auth import login, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.db.models.query_utils import Q
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from django.contrib.postgres.aggregates import ArrayAgg

from rest_framework import viewsets, filters, status, generics, views, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser


from OnlineOnboarding.settings import EMAIL_HOST_USER
from onboarding.models import Package, ContactRequestDetail, Page, Section, Answer
from onboarding.models import User, Company, CompanyQuestionAndAnswer

from .serializers import PackageSerializer, PageSerializer, SectionSerializer 
from .serializers import UserSerializer, CompanyQuestionAndAnswerSerializer, UserAvatarSerializer
from .serializers import AnswerSerializer, CompanySerializer, UsersListSerializer, UserJobDataSerializer, LogInUserSerializer

from .permissions import IsHrUser
from .mailing import UserEmailCRUD
from .tokens import account_activation_token
from .forms import HrSignUpForm


def index(request):
    """View function for home page of site."""
    return render(request, 'index.html')


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now ' +
                            'you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')


def signup(request):
    if request.method == 'POST':
        signup_form = HrSignUpForm(request.POST)
        if signup_form.is_valid():
            user = signup_form.save()

            current_site = get_current_site(request)
            subject = 'Rejestracja w Online Onboarding '
            html_message = render_to_string(
                'templated_email/acc_active_email.html', 
                {
                    'user': user,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                }
            )
            plain_message = strip_tags(html_message)
            from_email = EMAIL_HOST_USER
            to = signup_form.cleaned_data.get('email')
            mail.send_mail(
                            subject,
                            plain_message,
                            from_email,
                            [to],
                            html_message=html_message
            )
            return HttpResponse(
                'Please confirm your email address to complete the ' +
                'registration'
            )
    else:
        signup_form = HrSignUpForm()
    return render(
                    request, 
                    'bootstrap/auth-signup.html', 
                    {'form': signup_form},
    )


def password_reset_request(request):
    if request.method == 'POST':
        password_reset_form = PasswordResetForm(request.POST)
        if password_reset_form.is_valid():
            data = password_reset_form.cleaned_data['email']
            associated_users = User.objects.filter(Q(email=data))
            if associated_users.exists():
                for user in associated_users:
                    subject = 'Zmiana hasła' # eng. "password change"
                    html_message = render_to_string(
                        'templated_email/password_reset_email.html', 
                        {
                            'email': user.email,
                            'domain': '127.0.0.1:8000',
                            'site_name': 'Website',
                            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                            'user': user,
                            'token': default_token_generator.make_token(user),
                            'protocol': 'http',
                        }
                    )
                    plain_message = strip_tags(html_message)
                    try:
                        mail.send_mail(
                                        subject,
                                        plain_message,
                                        'admin@example.com',
                                        [user.email],
                                        html_message=html_message,
                                        fail_silently=False
                        )
                    except BadHeaderError:
                        return HttpResponse('Invalid header found.')
                    return redirect('/password_reset/done/')

    password_reset_form = PasswordResetForm()

    return render(
        request=request,
        template_name='registration/password_reset_form.html',
        context={'password_reset_form': password_reset_form}
    )


# should send information to front about send reminder or not?
@login_required() 
def reminder(request, employee_id, package_id):
    current_site = get_current_site(request)
    subject = 'Przypomnienie'
    employee = User.objects.get(id=employee_id)
    package = Package.objects.get(id=package_id)
    if request.user.company == employee.company:
        html_message = render_to_string(
            'templated_email/button_reminder.html',
            {
                'user': employee,
                'package': package,
                'domain': current_site.domain,
            }
        )
        plain_message = strip_tags(html_message)
        from_email = EMAIL_HOST_USER
        to = employee.email
        mail.send_mail(
                        subject, 
                        plain_message, 
                        from_email,
                        [to], 
                        html_message=html_message,
        )
    return HttpResponse(current_site)


@login_required
def manager_view(request):
    """
    hr/employee have different template
    :param request: need information this user is hr?
    :return: template for hr and for employee
    """
    if request.user.is_hr:  # for hr
        return render(request, 'react/hr.html')
    if not request.user.is_hr:  # for employee
        return render(request, 'react/employee.html')


# REST

# ViewSets define the view behavior

class UserAvatarUpload(views.APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserAvatarSerializer(data=request.data, instance=request.user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (IsHrUser, IsAuthenticated)
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(company=self.request.user.company)

    @action(detail=False, methods=['get'])
    def login_user(self, request):
        queryset = User.objects.filter(pk=self.request.user.id)
        serializer = LogInUserSerializer(queryset, many=True)
        return Response(serializer.data)

    def list(self, request):

        queryset = User.objects.filter(company=self.request.user.company)
        serializer = UsersListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def create_user(self, request):
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user, password = user_serializer.save()
            user.company = request.user.company
            user.save()
            mail = UserEmailCRUD()
            mail.send_to_user_created_by_hr(request, password, user)
            return Response(status=201)
        else:
            return Response(status=204)

    @action(detail=False)
    def remove_user(self, request):
        user_email = request.user.email
        username = request.user.username
        request.user.email = 'removed'
        request.user.first_name = 'removed'
        request.user.last_name = 'removed'
        request.user.is_active = False
        request.user.save()

        subject = 'Usunięcie konta'  # eng. "deletion of the account"

        html_message = render_to_string(
            'templated_email/remove_acc_email.html', 
            {
                'username': username,
            }
        )
        plain_message = strip_tags(html_message)
        from_email = EMAIL_HOST_USER
        to = user_email
        mail.send_mail(
                        subject, 
                        plain_message, 
                        from_email,
                        [to], 
                        html_message=html_message,
        )
        return Response(status=204)

class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


    # @action(detail=False)
    # def user_job_data(self, request):
    #     queryset = User.objects.filter(company=self.request.user.company).aggregate(location=ArrayAgg('location', distinct=True))
    #     from django.db import connection
    #     connection.queries
    #         # .aggregate(result=ArrayAgg('team'))\
    #         # .aggregate(result=ArrayAgg('job_position'))
    #         # .distinct("location",'team','job_position',)
    # 
    #     serializer = UserJobDataSerializer(queryset, many=True)
    # 
    #     return Response(serializer.data)


class CompanyQuestionAndAnswerViewSet(viewsets.ModelViewSet):
    queryset = CompanyQuestionAndAnswer.objects.all()
    serializer_class = CompanyQuestionAndAnswerSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        serializer.save(company=self.request.user.company)

    @action(detail=False)
    def list_by_company(self, request):
        """
        :param request: user
        :return: all Q-and-A with param request.user.company
        """
        q_and_a = CompanyQuestionAndAnswer.objects.filter(company=request.user.company)
        serializer = CompanyQuestionAndAnswerSerializer(q_and_a, many=True)

        return Response(serializer.data)


class ContactFormViewSet(viewsets.ModelViewSet):
    """
    List all packages, update or create a new package.
    """
    queryset = ContactRequestDetail.objects.all()
    serializer_class = ContactRequestDetail


class PackageViewSet(viewsets.ModelViewSet):
    """
    List all package, or create a new package.
    """
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.company)


    @action(detail=False)
    def list_by_company_hr(self, request):
        """
        :param request: user
        :return: all packages with param request.user = owner
        """
        package = Package.objects.filter(owner=request.user.company)
        serializer = PackageSerializer(package, many=True)

        return Response(serializer.data)

    @action(detail=False)
    def list_by_company_employee(self, request):
        """
        :param request: user
        :return: all packages with param request.user = owner
        """
        package = Package.objects.filter(
                                        owner=request.user.company, 
                                        users=request.user
        )
        serializer = PackageSerializer(package, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def add_user_to_package(self, request, pk=None):
        """
        :param request: user id in request.data.users
        :param pk: package primary key
        """
        package = Package.objects.get(id=pk)
        pkg_company = package.owner
        hr_user = User.objects.get(id=request.user.id)
        user = User.objects.get(id=request.data["users"])
        
        # check if the hr_user is from the same company as the package (form) 
        # to which he /she wants to add a new user
        if hr_user.company_id == pkg_company.id:
            pass
        else:
            e = "Możesz dodawać tylko do formularzy firmy, do której należysz."
            raise ValueError(e)
        
        # check if the hr_user is from the same company as the user 
        # he /she wants to add to the package (form)
        if hr_user.company_id == user.company_id:
            pass
        else:
            e2 = "Możesz dodawać do formularzy tylko tych użytowników, którzy"
            e3 = " są z tej samej firmy."
            e4 = e2 + e3
            raise ValueError(e4)

        if user not in package.users.all():
            package.users.add(user)

            subject = f'Dodano użytkownika {user} do {package}'
            html_message = render_to_string(
                'templated_email/add_user_to_form.html', 
                {
                    "username": user,
                    "package": package
                }
            )
            plain_message = strip_tags(html_message)
            from_email = EMAIL_HOST_USER
            to = hr_user.email

            mail.send_mail(
                            subject, 
                            plain_message, 
                            from_email, 
                            [to], 
                            html_message=html_message,
            )

        serializer = PackageSerializer(package)

        return Response(serializer.data)


class PageViewSet(viewsets.ModelViewSet):
    """
    Page Model View Set
    """
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']
    permission_classes = [IsAuthenticated]



    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.company)


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(
                        serializer.data, 
                        status=status.HTTP_201_CREATED, 
                        headers=headers,
        )


    @action(detail=True)
    def list_by_package_hr(self, request, pk):
        """
        :param request:
        :param pk: this is package ID
        :return: pages list by package Pk, filter by package and pages owner
        """
        page = Page.objects.filter(
            package__id=pk # add in the future,owner__page=request.user.company
        )
        serializer = PageSerializer(page, many=True)

        return Response(serializer.data)


    @action(detail=True)
    def list_by_package_employee(self, request, pk):
        """
        :param request:
        :param pk: this is package ID
        :return: pages list by package Pk, filter by package and pages owner
        """
        page = Page.objects.filter(
                                    package__id=pk,
                                    owner=self.request.user.company,
                                    package__users=self.request.user,
        )
        serializer = PageSerializer(page, many=True)

        return Response(serializer.data)


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.company)


    @action(detail=True)
    def list_by_page_hr(self, request, pk):
        """
        :param request:
        :param pk: this is page ID
        :return: sections list by page id
        """
        section = Section.objects.filter(
                                            page__id=pk,
                                            owner=self.request.user.company
        ) # add in the future
        # owner__page=request.user.company
        serializer = SectionSerializer(section, many=True)

        return Response(serializer.data)


    @action(detail=True)
    def list_by_page_employee(self, request, pk):
        """
        :param request:
        :param pk: this is page ID
        :return: sections list by page id
        """
        section = Section.objects.filter(
                                        page__id=pk,
                                        owner=self.request.user.company,
                                        page__package__users=self.request.user,
        )
        serializer = SectionSerializer(section, many=True)

        return Response(serializer.data)


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['release_date']
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    @action(detail=True)
    def list_by_section_hr(self, request, pk):
        """
        :param request:
        :param pk: this is section ID
        :return: answers list by section id
        """
        answer = Answer.objects.filter(
                        section__id=pk,
                        section__page_package__owner=self.request.user.company,
        )
        serializer = AnswerSerializer(answer, many=True)

        return Response(serializer.data)


    @action(detail=True)
    def list_by_section_employee(self, request, pk):
        """
        :param request:
        :param pk: this is section ID
        :return: answers list by section id
        """
        answer = Answer.objects.filter(
                                section__id=pk,
                                owner=self.request.user,
                                section__page_package__user=self.request.user
        )
        serializer = AnswerSerializer(answer, many=True)

        return Response(serializer.data)
