import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeDeDE from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { CoreModule } from './core/core.module';
import { ContactModule } from './views/contact/contact.module';
import { EditionModule } from './views/edition/edition.module';
import { ProjectModule } from './views/project/project.module';
import { ResearchModule } from './views/research/research.module';
import { WebernModule } from './views/webern/webern.module';
import { WorksModule } from './views/works/works.module';

/* Load and register the used locale file */
registerLocaleData(localeDeDE);

@NgModule({
    declarations: [AppComponent, routedComponents],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
        ContactModule,
        EditionModule,
        ProjectModule,
        ResearchModule,
        WebernModule,
        WorksModule,
        AppRoutingModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de-DE' }, // Change global LOCALE-ID
        provideHttpClient(withInterceptorsFromDi()),
    ],
})
export class AppModule {}
