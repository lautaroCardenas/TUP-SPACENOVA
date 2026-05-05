import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IAsteroids } from './interfaces';

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

        const mappedAsteroids:IAsteroids[] = data.flat().map((a:any) => ({
          name: a.name,
          minDiameter: a.estimated_diameter.meters?.estimated_diameter_min.toFixed(2),
          maxDiameter: a.estimated_diameter.meters?.estimated_diameter_max.toFixed(2),
          hazardous: a.is_potentially_hazardous_asteroid,
          approachDate: a.close_approach_data[0].close_approach_date_full,
          velocity: Number(a.close_approach_data[0].relative_velocity?.kilometers_per_hour),
          orbitingBody: a.close_approach_data[0].orbiting_body
        }))
        
        localStorage.setItem(this.ASTEROIDS_KEY, JSON.stringify(mappedAsteroids))
        return mappedAsteroids

      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
  
}
