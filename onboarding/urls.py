from django.urls import path, include
from . import views
from . import views as core_views
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers

from .views import PackageViewSet, PageViewSet, SectionViewSet, UserViewSet, AnswerViewSet, CompanyViewSet

urlpatterns = [

    path('', views.index, name='index'),
    url('signup', core_views.signup, name='signup'),
    path('manage/', views.manager_view, name='manage'),
    path('bootstrap/dashboard', views.bootstrap_dashboard, name='bootstrap_dashboard'),
    path('bootstrap/packages', views.bootstrap_packages, name='bootstrap_packages'),
    path('bootstrap/package-page', views.bootstrap_1_package, name='bootstrap_1_package'),
    path('bootstrap/forms', views.bootstrap_forms, name='bootstrap_forms'),
]

# Email

urlpatterns += [path('email/activate/<uidb64>/<token>/', views.activate, name='activate'),
                path('email/reminder/<employee_id>/<package_id>/', views.reminder, name='reminder'),
                ]


# API

router = DefaultRouter()
router.register(r'api/users', UserViewSet, basename='User')
router.register(r'api/company', CompanyViewSet, basename='Company')
router.register(r'api/package', PackageViewSet, basename='Package')
router.register(r'api/page', PageViewSet, basename='Page')
router.register(r'api/section', SectionViewSet, basename='Section')
router.register(r'api/answer', AnswerViewSet, basename='Answer')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns += [
    path(r'', include(router.urls)),
    path(r'api/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', obtain_auth_token, name='api-token-auth')

]