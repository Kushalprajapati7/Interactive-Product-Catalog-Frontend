import { Component, OnInit } from '@angular/core'
import { IUser } from 'src/app/core/interfaces/userInterface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalEvents: number = 0;
  constructor (
    private userService:UserService,
  ){}
  ngOnInit(): void {
    this.loadTotalUsers()
  }
  loadTotalUsers(): void {
    this.userService.allUser().subscribe(
      (users: IUser[]) => {
        this.totalUsers = users.length;
      },
      (error) => {
        console.error('Error loading total users:', error);
      }
    );
  }

  

  
}
