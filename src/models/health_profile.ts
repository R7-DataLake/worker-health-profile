import getConnection from "../db"

export class HealthProfileModel {

  async saveScreening(data: any): Promise<any> {
    const db = await getConnection();
    return new Promise((resolve: any, reject: any) => {
      db('screening')
        .insert(data)
        .onConflict(['hospcode', 'hn', 'date_serv', 'time_serv'])
        .merge(['sbp', 'dbp', 'pr', 'rr', 'height', 'weight', 'updated_at'])
        .then(() => resolve())
        .catch((error: any) => reject(error))
        .finally(async () => {
          await db.destroy();
        });
    });
  }

}