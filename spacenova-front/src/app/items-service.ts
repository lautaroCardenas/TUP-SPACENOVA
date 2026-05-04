import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  readonly http = inject(HttpClient)

  API_URL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key='
  API_KEY = '6U6EJ2FYWVaAyd55wY6loz9JcGIs4IwDMuVRv3iV'
  ASTEROIDS_KEY = 'asteroids'

  async getAsteroids () {
    const asteroids = localStorage.getItem(this.ASTEROIDS_KEY)

    if (asteroids) {
      return JSON.parse(asteroids)
    } else {
      try {
        const res = await lastValueFrom(this.http.get<any>(this.API_URL + this.API_KEY))
        const data = Object.values(res.near_earth_objects)
        // const data = res.near_earth_objects
        
        localStorage.setItem(this.ASTEROIDS_KEY, JSON.stringify(data))
        return data
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
  
}
