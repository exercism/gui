export function initialize(application) {
  application.inject('controller', 'selections', 'service:selections');
}

export default {
  name: 'selections',
  initialize
};
