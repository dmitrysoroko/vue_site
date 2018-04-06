<template lang="pug">
	div
		div#ArticleEditor(
			contenteditable,
			@input="change",
			@keyup="test()",
			@mouseup="test()"
		)
		button( @click="img" ) img
		template {{ pos }}
</template>

<script>
	export default {
		props: ['value'],

		data() {
			return {
				innerHTML: this.value,
				text: null,
				articleEditor: undefined,
				pos: 0
			}
		},

		methods: {
			getCaretPosition(element) {
				let caretOffset = 0;
				const doc = element.ownerDocument || element.document;
				const win = doc.defaultView || doc.parentWindow;
				if (typeof win.getSelection !== 'undefined') {
					if (win.getSelection().rangeCount > 0) {
						const range = win.getSelection().getRangeAt(0);
						const preCaretRange = range.cloneRange();
						preCaretRange.selectNodeContents(element);
						preCaretRange.setEnd(range.endContainer, range.endOffset);
						caretOffset = preCaretRange.toString().length;
					}
				} else if (doc.selection && doc.selection.type !== 'Control') {
					const textRange = doc.selection.createRange();
					const preCaretTextRange = doc.body.createTextRange();
					preCaretTextRange.moveToElementText(element);
					preCaretTextRange.setEndPoint('EndToEnd', textRange);
					caretOffset = preCaretTextRange.text.length;
				}
				return caretOffset;
			},

			test() {
				this.pos = this.getCaretPosition(this.articleEditor)
			},

			change() {
				if (this.articleEditor.firstChild && this.articleEditor.firstChild.nodeType === 3) {
					const pElement = document.createElement('p')
					pElement.appendChild(this.articleEditor.firstChild)
					this.articleEditor.prepend(pElement)
					const range = document.createRange();
					const sel = window.getSelection();
					range.setStart(this.articleEditor.firstChild, 1);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
				this.innerHTML = this.articleEditor.innerHTML
				this.$emit('input', this.innerHTML)
			},

			img() {
				const range = window.getSelection().getRangeAt(0)
				range.collapse(false)
				const el = document.createElement('img')
				el.setAttribute('alt', 'Hello')
				el.setAttribute('src', 'https://photos-6.dropbox.com/t/2/AAB0ZLPyBRA0CUX_Z-1yMutCrEYHTXj8sWy1-xB-oTxfIQ/12/816274752/png/32x32/1/_/1/2/Untitled.png/EKDS5fsIGAkgBygH/2-64zzJtycry5dCqC8HEqHPNJJDwfWb9HReuJY_pJ-8?preserve_transparency=1&size=1280x960&size_mode=3')
				range.insertNode(el)
				this.innerHTML = this.articleEditor.innerHTML
				this.$emit('input', this.innerHTML)
			}
		},

		mounted() {
			document.execCommand('defaultParagraphSeparator', false, 'p')
			this.articleEditor = document.getElementById('ArticleEditor')
		}
	}
</script>
<style lang="sass" scoped>
	#ArticleEditor
		margin: 5px
		margin-top: 20px
		background: white
		border: 1px solid black
		width: 90%
		height: 500px
</style>
