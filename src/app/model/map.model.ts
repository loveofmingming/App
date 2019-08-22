import { Injectable } from '@angular/core';
import { Geolocation  } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var BMap;
@Injectable()

export class MapModel {
  gps_mess:any;
  constructor(
              public http: HttpClient,
              public geolocation:Geolocation,
              
            ) { 
    this.gps_mess = 'gps加载中...';
  }

//获取经纬度
gps_play(){
    alert('获取经纬度');
    //39.962653,116.820007
    //39.968381,116.832371
    this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp.coords.latitude,resp.coords.longitude);
        this.get_address_bybaidumap(resp.coords.latitude+0.006000,resp.coords.longitude+0.010000);
    }).catch((error) => {
        console.log('Error getting location', error);
    });
}

//拉取授权gps
gps_play_shouquan(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.get_address_bybaidumap_shouquan(resp.coords.latitude+0.006000,resp.coords.longitude+0.010000);
   }).catch((error) => {
    console.log(error);
   });
}
/**
 * 
 * @param x 授权获取百度地图具体位置
 * @param y 
 */
get_address_bybaidumap_shouquan(x,y){
  let that = this;
  //原始GPS坐标转为百度坐标
  var baiduPoint = new BMap.Point(y,x);
  var myGeo = new BMap.Geocoder();
  myGeo.getLocation(baiduPoint,function(result){
      if(result){
        console.log(result.addressComponents.city);
      }else{
        return 'err';
      }
  });
}

 /**
   * 获取当前时间
   */
  getTodayTime(){
    return new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
  }

  /**
   * 获取当前时间 增加几个小时
   */
  getTodayTimeAddHours(hours:number){
    return new Date(+new Date()+8*3600*1000+hours*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
  }


//百度地图地理逆编码
    get_address_bybaidumap(x,y){
        let that = this;
        //原始GPS坐标转为百度坐标
        var baiduPoint = new BMap.Point(y,x);
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(baiduPoint,function(result){
            if(result){
                // alert(JSON.stringify(result));
                this.gps_mess  = result.addressComponents.province+'-'+result.addressComponents.city+'-'+result.addressComponents.district+
                    '-'+result.addressComponents.street;
                // console.log(this.gps_mess);
            }else{
                return 'err';
            }
        });
    }

//首页获取市
    get_city_gps(){
        console.log('获取gps');
        return this.geolocation.getCurrentPosition();
        //   .then((resp) => {
        //   resp.coords.latitude = resp.coords.latitude+0.006000;
        //   resp.coords.longitude = resp.coords.latitude+0.010000;
        //   return resp.coords;
        //   //return this.get_address_bybaidumap_city(resp.coords.latitude+0.006000,resp.coords.longitude+0.010000);
        //  }).catch((error) => {
        //   return '无法定位';
        //  });
    }

//百度地图地理逆编码-shi
    get_address_bybaidumap_city(x,y){
        // console.log(58);
        // console.log(x);
        // console.log(y);
        // console.log(58);
        let that = this;
        //原始GPS坐标转为百度坐标
        var baiduPoint = new BMap.Point(y,x);
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(baiduPoint,function(result){
            if(result){
                alert(JSON.stringify(result));
                var address = result.addressComponents.province+'-'+result.addressComponents.city+'-'+result.addressComponents.district+
                    '-'+result.addressComponents.street;
                return address;
            }else{
                return 'err';
            }
        });
    }


    //根据传入的经纬度计算两个坐标间的距离
    getDistanceByJW(lon1,lat1,lon2,lat2){
        var map = new BMap.Map("allmap");    // 创建Map实例
        var point1 = new BMap.Point(116.866206, 40.011705);
        var point2 = new BMap.Point(116.809829, 39.944315);
        var distance =map.getDistance(point1, point2);
        // console.log(distance);
        return distance;
    }
    
    //获取经纬度
    gps_x_y()
    {
        return new Promise((resolve, reject) => {
            try
            {
                this.geolocation.getCurrentPosition().then((resp) => {
                    let x_y:any = {
                        latitude:resp.coords.latitude,
                        longitude:resp.coords.longitude
                    }
                    resolve(x_y);
                });
            }
            catch (err)
            {
                reject({err: err});
            }
        });

    }
}
