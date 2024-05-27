import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResearchPublicationsComponent } from './research-publications.component';

describe('ResearchPublicationsComponent', () => {
    let component: ResearchPublicationsComponent;
    let fixture: ComponentFixture<ResearchPublicationsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ResearchPublicationsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResearchPublicationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
