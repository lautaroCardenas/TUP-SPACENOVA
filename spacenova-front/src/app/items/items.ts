import { Component, inject } from '@angular/core';
import { ItemsService } from '../items-service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ItemsSearchPipe } from '../items-search-pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { Sidenav } from '../sidenav/sidenav';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule, ItemsSearchPipe, MatProgressSpinnerModule, 
    MatInputModule, MatFormFieldModule, FormsModule, MatMenuModule, 
    MatButtonModule, MatSliderModule, Sidenav
  ],
  templateUrl: './items.html',
  styleUrl: './items.css',
})

export class Items {
  itemsService = inject(ItemsService)
  ASTEROIDS_KEY = 'asteroids'
  asteroidsArray: any = []
  loading: boolean = false
  asteroidsFilter: string = ''
  selectedFilter: string = ''
  sliderMin = 2000
  sliderMax = 100000
  sliderStep = 1000
  value = 0

  setFilter (filter:string) {
    this.selectedFilter = filter
  }

  async ngOnInit() {
    // this.loading = true
    const asteroids = localStorage.getItem(this.ASTEROIDS_KEY)
    if (asteroids) {
      this.asteroidsArray = JSON.parse(asteroids)
    }

    const res = await this.itemsService.getAsteroids()
    // const date = Object.keys(res)[0]
    
    if (res) {
      localStorage.setItem(this.ASTEROIDS_KEY, JSON.stringify(res))
      this.asteroidsArray = res
      // console.log(this.asteroidsArray)
      // console.log(Array.isArray(this.asteroidsArray))
      this.loading = false
    }
  }
}
