import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
    {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    {path: 'binding', loadChildren: './binding/binding.module#BindingPageModule'},
    {path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInPageModule'},
    {path: 'setting', loadChildren: './my/setting/setting.module#SettingPageModule'},
    {path: 'credit', loadChildren: './my/balance/credit/credit.module#CreditPageModule'},
    {path: 'dhb', loadChildren: './my/balance/dhb/dhb.module#DhbPageModule'},
    {path: 'rmb', loadChildren: './my/balance/rmb/rmb.module#RmbPageModule'},
    {path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule'},
    {path: 'about', loadChildren: './about/about.module#AboutPageModule'},
    {path: 'profile', loadChildren: './my/profile/profile.module#ProfilePageModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
