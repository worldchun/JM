export default {
	toast(title,type='text') {
		if(title.length > 7) {
			console.error('toast长度超过7个字符，当前长度为'+title.length)
			return
		}
		var icon = 'none'
		if(type) {
			switch(type) {
				case 'text':
					icon='none'
					break;
				case 'success':
					icon='success'
					break
				case 'error':
					icon='error'
					break
			}
		}
		uni.showToast({
			title,
			icon
		})
	},
	confirm(title)
}