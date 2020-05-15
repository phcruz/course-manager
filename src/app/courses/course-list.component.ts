import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

  filteredCourses: Course[] = [];

  courses: Course[] = [];

  filterBy: string;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.retrieveAll();
  }

  retrieveAll(): void {
    this.courseService.retrieveAll().subscribe({
      next: courses => {
        console.log(courses);
        this.courses = courses;
        this.filteredCourses = this.courses;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  deleteById(courseId: number): void {
    this.courseService.deleteById(courseId).subscribe({
      next: () => {
        console.log('Deleted with success');
        this.retrieveAll();
      }, error: err => {
        console.log(err);
      }
    });
  }
  set filter(value: string) {
    this.filterBy = value;

    this.filteredCourses = this.courses.filter(
      (course: Course) => course.name.toLocaleLowerCase().indexOf(this.filterBy.toLocaleLowerCase()) > -1);
  }

  get filter() {
    return this.filterBy;
  }
}
