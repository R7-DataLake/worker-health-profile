import { HealthProfileModel } from './models/health_profile'
import { UtilsModel } from './models/utils';

const healthProfileModel = new HealthProfileModel()
const utilsModel = new UtilsModel();

export default async (job: any) => {
  switch (job.name) {

    case 'SCREENING': {
      const data = job.data.screening
      await healthProfileModel.saveScreening(data)
      break
    }

    case 'APPOINT': {
      const _data = job.data.appoint
      const tmpData: any[] = utilsModel.appointGroupBy(_data);

      let data: any[] = [];
      for await (const item of tmpData) {
        const obj: any = {};
        obj.hospcode = item.hospcode;
        obj.hn = item.hn;

        obj.apoint_date = item.apoint_date;
        obj.appoint_time = item.appoint_time;
        obj.remark = item.remark;
        obj.created_at = item.created_at;
        obj.updated_at = item.updated_at;
        data.push(obj);
      }

      await healthProfileModel.saveAppoint(data)
      break
    }

  }
}