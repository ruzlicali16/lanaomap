<template> 
	<div class="bg-tranparent 
	text-center text-overline" 
	:style="$q.screen.lt.md? 'font-size: 20px' : 'font-size: 15px'">
			<span class="text-red">LA</span>
			<span class="text-yellow-9">NAO </span>
			<span class="text-blue" v-if="!$q.screen.lt.md">HERITAGE </span>
			<span class="text-green">MAP</span>
	</div>
</template>