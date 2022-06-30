import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { AlternativePublicComponent } from './alternative-public/alternative-public.component';
import { BigAlternativePublicComponent } from './big-alternative-public/big-alternative-public.component';
import { OnlySvgPublicComponent } from './only-svg-public/only-svg-public.component';

const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./public/components/public.module').then((m) => m.PublicModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./only-svg-public/only-svg-public.module').then(
        (m) => m.OnlySvgPunlicModule
      ),
  },
  { path: '2', component: AlternativePublicComponent },
  { path: '3', component: BigAlternativePublicComponent },
  { path: 'svg', component: OnlySvgPublicComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AlternativePublicComponent,
    BigAlternativePublicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
