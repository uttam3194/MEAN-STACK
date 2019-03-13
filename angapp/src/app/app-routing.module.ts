import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UsereditComponent } from './useredit/useredit.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TrainingaddComponent } from './trainingadd/trainingadd.component';
import { TrainingviewComponent } from './trainingview/trainingview.component';
import { TrainingeditComponent } from './trainingedit/trainingedit.component';
import { UseravailtrainingsComponent } from './useravailtrainings/useravailtrainings.component';
import { UsertrainingviewComponent } from './usertrainingview/usertrainingview.component';
import { TrainingusersComponent } from './trainingusers/trainingusers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'userhome',
    component: UserhomeComponent
  },
  {
    path: 'user/trainings',
    component: UseravailtrainingsComponent
  },
  {
    path: 'user/trainings/view',
    component: UsertrainingviewComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'training/users/:trainingId',
    component: TrainingusersComponent
  },
  {
    path: 'edit/:id',
    component: UsereditComponent
  },
  {
    path: 'add',
    component: TrainingaddComponent
  },
  {
    path: 'view',
    component: TrainingviewComponent
  },
  {
    path: 'training/edit/:id',
    component: TrainingeditComponent
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
