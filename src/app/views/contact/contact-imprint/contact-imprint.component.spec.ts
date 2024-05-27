import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterLinkStubDirective } from '@testing/router-link-stub.directive';

import { ContactImprintComponent } from './contact-imprint.component';

describe('ContactImprintComponent', () => {
    let component: ContactImprintComponent;
    let fixture: ComponentFixture<ContactImprintComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ContactImprintComponent, RouterLinkStubDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(ContactImprintComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
