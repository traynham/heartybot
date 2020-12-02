module.exports = (str) => {

	str = str.replace(/_/g, ' ')
	return str.toLowerCase().split(' ').map(function(word) {
		return word.replace(word[0], word[0].toUpperCase())
	}).join(' ')

}