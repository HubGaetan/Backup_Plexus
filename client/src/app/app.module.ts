import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';


// Importez d'autres modules, composants, etc.

@NgModule({
    declarations: [AppComponent

        // Déclarez vos composants ici
    ],
    imports: [
        BrowserModule,
        ButtonModule,
        // Importez d'autres modules utilisés dans votre application
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
