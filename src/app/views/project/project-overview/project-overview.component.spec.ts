import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterLinkStubDirective } from '@testing/router-link-stub.directive';

import { ProjectOverviewComponent } from './project-overview.component';

describe('ProjectOverviewComponent', () => {
    let component: ProjectOverviewComponent;
    let fixture: ComponentFixture<ProjectOverviewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectOverviewComponent, RouterLinkStubDirective],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
