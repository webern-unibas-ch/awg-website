import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContactAddressComponent } from './contact-address.component';

describe('ContactAddressComponent', () => {
    let component: ContactAddressComponent;
    let fixture: ComponentFixture<ContactAddressComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ContactAddressComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContactAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
