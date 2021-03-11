import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;

  constructor(
    private authService: AuthService,
    private router:Router
    ) { 
    }
    
    ngOnInit() {
    }
    
    async loginUser(event: FormGroup) {
      // console.log(event);
      
      const { email, password } = event.value
      try {
        await this.authService.loginUser(email, password);
        this.router.navigate(['/']);
    } catch (err) {
      this.error = err.message;
    }
  }
}
