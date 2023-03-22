export class UtilsModel {
  appointGroupBy(arr: any[]) {

    var helper: any = {};
    var result = arr.reduce(function (r, o) {
      var key = o.hospcode + '-' + o.hn;

      if (!helper[key]) {
        helper[key] = Object.assign({}, o); // create a copy of o
        r.push(helper[key]);
      } else {
        helper[key].used += o.used;
        helper[key].instances += o.instances;
      }

      return r;
    }, []);

    return result || [];
  }
}