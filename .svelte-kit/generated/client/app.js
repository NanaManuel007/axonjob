export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')
];

export const server_loads = [0];

export const dictionary = {
		"/": [5],
		"/private/all_applications": [7,[2]],
		"/private/all_bookings": [8,[2]],
		"/private/all_candidates": [9,[2]],
		"/private/all_candidates/candidate_details/[id]": [10,[3]],
		"/private/all_clients": [11,[2]],
		"/private/all_clients/clients_details/[id]": [12,[4]],
		"/private/all_users": [13,[2]],
		"/private/home": [14,[2]],
		"/private/[...404]": [6,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';