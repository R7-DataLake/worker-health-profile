import { HealthProfileModel } from './models/health_profile'

const healthProfileModel = new HealthProfileModel()

export default async (job: any) => {
  switch (job.name) {

    case 'SCREENING': {
      const data = job.data.screening
      await healthProfileModel.saveScreening(data)
      break
    }

  }
}