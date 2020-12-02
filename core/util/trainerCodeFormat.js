module.exports = (code) => {
	
	if(!code) code = '••••••••••••'

	return code.replace(/(....)(....)(....)/, '$1 $2 $3')

}