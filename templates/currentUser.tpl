<header>
	<img class="picture" src="res/images/noImg.jpg" alt="<%- name %>">
	<div class="name"><%- name %></div>
</header>
<div class="mail"><%- mail %></div>
<div class="phone"><%- phone %></div>
<div class="group"><%- group %></div>
<% if(name){ %>
	<div class="buttonSet">
		<button id="edit" type="button" data-id="<%- id %>">Edit</button>
		<button id="remove" type="button" data-id="<%- id %>">Remove</button>
	</div>
<% } %>