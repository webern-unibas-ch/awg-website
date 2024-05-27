import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouterLinkStubDirective } from '@testing/router-link-stub.directive';

import { ProjectNewsArchiveComponent } from './project-news-archive.component';

describe('ProjectNewsArchiveComponent', () => {
    let component: ProjectNewsArchiveComponent;
    let fixture: ComponentFixture<ProjectNewsArchiveComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectNewsArchiveComponent, RouterLinkStubDirective],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectNewsArchiveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
