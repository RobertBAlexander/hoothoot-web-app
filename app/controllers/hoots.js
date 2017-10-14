/**
 * Created by Robert Alexander on 14/10/2017.
 */
'use strict';

'use strict';

exports.home = {

  handler: (request, reply) => {
    reply.view('home', { title: 'Welcome to Hoot Hoots' });
  },

};

exports.report = {

  handler: function (request, reply) {
    reply.view('report', { title: 'Hoots to Date', hoots: this.hoots, });
  },

};

exports.hoot = {

  handler: function (request, reply) {
    const data = request.payload;
    data.user = 'homer@simpson.com'; //temporary full e-mail until proper user storage occurs
    this.hoots.push(data);
    reply.redirect('/report');
  },

};
