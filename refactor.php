<?php


public function post_confirm(){
	$id = Input::get('service_id');
	$servicio = Service::find($id);
	//dd($servicio);
	if($servicio !=NULL){
		if($servicio->status_id =='6'){
			return Response::json(array('error'=>'2'));
		}
		if($servicio->driver_id== NULL && $servicio->status_id=='1'){
			$servicio = Service::update($id,array(
									'driver_id'=>Input::get('driver_id'),
									'status_id'=>'2',
									//Up Carro
									//,'pwd'=>md5(Input::get('pwd'))
			));
			$driverTmp = Driver::find(Input::get('driver_id'));
			Service::update($id,array(
				'car_id'=>$driverTmp->car_id
				//Up Carro
				//,'pwd'=>md5(Input::get('pwd'))
			));
			//Notificar a usuario!
			$pushMessage = 'Tu servicio ha sido confirmado';
			/*$servicio = Service::find($id);
				$push = Push.make();
				if($servicio->user->type=='1'){//iPhone
				$pushAns = push->ios($servicio->user->uuid,$pushMessage);
				}else{
				$pushAns = $push->android($servicio->user->uuid,$pushMeesage);
				}*/
				$servicio = Service::find($id);
				$push = Push::make();
				if($servicio->user->uuid==''){
					return Response::json(array('error'=>'0'));
				}
				if($servicio->user->type=='1'){//iPhone
					$result = $push->ios($servicio->user->uuid,$pushMessage,1,'honk.wav','Open',array('serviceId'=>$servicio_id));
				}else{
					$result = $push->android2($servicio->user->uuid,$pushMessage,1,'default','Open',array('serviceId'=>$servicio->id));
				}
				return Response::json(array('error'=>'0'));
		}else{
			return Response::json(array('error'=>'1'));
		}
	}else{
		return Response::json(array('error'=>'3'));
	}
};