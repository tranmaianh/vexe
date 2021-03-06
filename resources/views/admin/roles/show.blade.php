@extends('layouts.admin.master')
 
@section('contents')
	<div class="row">
	    <div class="col-lg-12 margin-tb">
	        <div class="pull-left">
	            <h2> CHI TIẾT QUYỀN</h2>
	        </div>
	        <div class="pull-right">
	            <a class="btn btn-outline green button-pre btn-circle" href="{{ route('roles.index') }}"> Trở lại</a>
	        </div>
	    </div>
	</div>
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Tên:</strong>
                {{ $role->display_name }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Mô tả:</strong>
                {{ $role->description }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Quyền:</strong>
                @if(!empty($rolePermissions))
					@foreach($rolePermissions as $v)
						<label class="label label-success" style="-moz-border-radius: 10px;
	-webkit-border-radius: 10px;">{{ $v->display_name }}</label>
					@endforeach
				@endif
            </div>
        </div>
	</div>
@endsection