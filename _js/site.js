$(document).ready(function(e){
	/*ajax ayarları*/
	$.ajaxSetup({type:'POST',url:'_ajax/_ajax.php',cache:false});
	/*açılır menü*/
	$("#menu li").mouseenter(function(){$(this).children("ul").show();}).mouseleave(function(){$(this).children("ul").hide();});	
	/*slider*/ 
	$('#slider').carousel({interval: 4000 });
	/*navigasyon*/
	$(document).on("click","#nav_article a", function(){$.ajax({data:{frm:'article',sayfa:$(this).attr("sayfa")},success:function(gelen){ $("article").html(gelen);$(".pull-center").parent("div").css('display','table-cell').css('text-align','center');}});});
	/*Üyelik*/
	$("#sifre1,#sifre2").blur(function(){if($("#sifre1").val()!=$("#sifre2").val()) $("#hata").show(100); else $("#hata").hide();});
	
	$(document).on("submit","#frmGiris",function(event){
		$.ajax({data:$("#frmGiris").serialize(),
	  	success:function(gelen){data=gelen.split('~');$("#giris").html(data[0]);mesaj(data);if(!data[2]) location.href="anasayfa";}});return false;
	});
	
	$(document).on("submit","#frm",function(event){
		$.ajax({data:$(this).serialize(),
	  	success:function(gelen){data=gelen.split('~');mesaj(data);}});return false;
	});
	
	$(document).on("click","#btnCikis",function(){
		$.ajax({ data:{frm:'cikis'},success:function(){location.href='anasayfa';}});return false;
	});
	
	/*btn-ajax ajax butonları*/
	
	$(document).on("click",".btn-ajax",function(){											
		$.ajax({ 
			   data:{frm:$(this).attr('frm'),id:$(this).attr('data-id')},
			   success:function(gelen){data=gelen.split('~');mesaj(data);}});
			   return false;
	});
	$(document).on("click",".btn-ajax-confirm",function(){											
		var title=$(this).attr('title');
		var onay= confirm(title+' işlemini yapmak istediğinizden emin misiniz?');
		if(onay){
		$.ajax({ 
			   data:{frm:$(this).attr('frm'),id:$(this).attr('data-id')},
			   success:function(gelen){data=gelen.split('~');mesaj(data);}});  return false;
		}
	});
	
	$(document).on('change', '.btn-file :file', function() {
		var input = $(this),
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
	});
	$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
		var input = $(this).parents('.input-group').find(':text'),
		log = numFiles > 1 ? numFiles + ' files selected' : label;
		if( input.length ) {
			input.val(log);
		} else {
			if( log ) alert(log);
		}
	});
	
	var progressbar=$('.progress-bar');
	$('#ajaxForm').ajaxForm({
		data:$(this).formSerialize(),
		type:'POST',
		url:'_ajax/_ajax.php',
		
		beforeSend: function() {
			progressbar.parent('div').parent('div').show();

			$(progressbar).progressbar({display_text: 'fill',refresh_speed: 10});
		},
		uploadProgress: function(event, position, total, percentComplete){
			$(progressbar).width(percentComplete+'%');
			$(progressbar).html(percentComplete+'%');
		},
		complete: function(response){
			$(progressbar).parent('div').parent('div').slideUp();
			$(progressbar).width(0+'%');
			$(progressbar).html('0%');
		},
		
		success:function(gelen){
			data=gelen.split('~');
			mesaj(data);
		}
	});

	
	
	$(document).on("click","#mesaj .alert button.close,#alert",function(){
  	if($("#mesaj .alert").hasClass('alert-success')||$("#mesaj .alert").hasClass('alert-info')){location.href='anasayfa';}
		else{$("#mesaj").fadeOut('slow');}
  });
	function mesaj(data){
		if(data[1]){$("#mesaj").show();$("#mesaj .alert").removeClass('alert-info').removeClass('alert-success').removeClass('alert-warning').removeClass('alert-danger').addClass('alert-'+data[1]);$("#mesaj p").html(data[2]);
		if(data[0]=='reload') location.reload();
		if(data[3]) location.href=data[3];
		}
	};
	
	veritablosu();
	function veritablosu(){
		$("#datatable").dataTable({
			"paging" : false,
			"info" : false,
			"language" : {
				"sSearch" : "Ara:",
				"sinfoEmpty" : "Kayıt Bulunamadı!",
				"sZeroRecords" : "Eşleşen Kayıt Bulunamadı"
			}
		});
	}
	/*popover*/
	$(function () {
  		$('[data-toggle="popover"]').popover();
	})
	/*ckeditor*/
	$(function () {
		var giris = CKEDITOR.replace('igiris');
		CKFinder.setupCKEditor(giris,'ckfinder');
		var metin = CKEDITOR.replace('imetin');
		CKFinder.setupCKEditor(metin,'ckfinder');
	});
	/*tarih*/
	$(function () {
			$('.tarih').datetimepicker({
				lang:'tr',format:'Y-m-d H:i:00',
				step:30,dayOfWeekStart:1
			});
			$('.btn-tarih').click(function(){
				$(this).parent('span').parent('div').children('input').datetimepicker('show');						   
			});
	});
	//navigasyon ortala
	$(".pull-center").parent("div").css('display','table-cell').css('text-align','center');
	
});