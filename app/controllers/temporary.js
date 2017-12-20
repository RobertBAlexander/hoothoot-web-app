/**
 * Created by Robert Alexander on 20/12/2017.
 */
'use strict';
const User = require('../models/user');
const Joi = require('joi');
const uuid = require('uuid');

exports.home = {

  handler: (request, reply) => {
    const userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(currentUser => {
      User.find({}).then(userArray => {
        let i = 0;
        while (i < userArray.length) {
          userArray[i].isFollowed = false;
          console.log('isfalse')
          let j = 0;
          while (j < userArray.followers.length) {
            if (userArray.followers[j] == currentUser._id)
            {
              userArray[i].isFollowed = true;
              console.log('true!!!')
            }
            else
            {
              console.log('definitely false')
            }
          }
        }
      });

    });
    reply.view('home', { title: 'Welcome to Hoot Hoots' });
  },

};
/*

let i = 0;

while (i < searchedClasses.length) {
  searchedClasses[i].numberAttended = 0;
  classStore.store.save();
  searchedClasses[i].lessons.forEach(function (lesson) {
        lesson.userIsAttending = 'red minus';
        searchedClasses[i].classAttend = 'none';//not sure if about fully attending that lesson, or ifuser is attending whole class
        classStore.store.save();

        let j = 0;
        while (j < lesson.attending.length) {
          if (lesson.attending[j] === userId) {
            lesson.userIsAttending = 'green check';
            searchedClasses[i].numberAttended = Number(searchedClasses[i].numberAttended) + 1;
            classStore.store.save();
          }

          j++;
        }

      }
  );
  if (searchedClasses[i].numberAttended = 0) {
    searchedClasses[i].classAttended = 'none';
    classStore.store.save();
  } else if ((searchedClasses[i].numberAttended >= 0) && (searchedClasses[i].numberAttended < searchedClasses[i].lessons.length)) {
    searchedClasses[i].classAttended = 'partial';
    classStore.store.save();
  } else if (searchedClasses[i].numberAttended === searchedClasses[i].lessons.length) {
    searchedClasses[i].classAttended = 'all';
    classStore.store.save();
  } else {
    searchedClasses[i].classAttended = 'indeterminate';
    classStore.store.save();
  }

  i++;
}
*/
