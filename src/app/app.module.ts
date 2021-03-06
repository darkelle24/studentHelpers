import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './core/_helpers/jwt.interceptor';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { AngularFireAnalyticsModule, CONFIG } from '@angular/fire/compat/analytics';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';

import { InfoTypeComponent } from './page/info-type/info-type.component';
import { InfoComponent } from './page/info/info.component';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { VerticalComponent } from './layout/vertical/vertical.component';
import { ShareComponent } from './page/share/share.component';
import { BarComponent } from './layout/vertical/gallerie-bar/bar/bar.component';
import { GallerieBarComponent } from './layout/vertical/gallerie-bar/gallerie-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoTypeComponent,
    InfoComponent,
    RegisterComponent,
    LoginComponent,
    LayoutComponent,
    VerticalComponent,
    ShareComponent,
    BarComponent,
    GallerieBarComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSelectModule,
    MatProgressBarModule,
    ShareButtonsModule,
    ShareIconsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: CONFIG, useValue: {
        debug_mode: false
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
