import Swal from 'sweetalert2';

let Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000
});

const alert = (icon, title) => {
	Toast.fire({
		icon,
		title
	})
}


export { alert }

