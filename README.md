/* Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php */

The goal of this project is to produce a polyfill that conforms to the W3C spec as closely as possible not only in user interaction, but also in application interaction and markup.

My initial desire was to create an independent polyfill, but time requirements lead me to an initial jQuery dependent version. I was able to follow that up with a completely independent version, but I still need to do lots of testing. 

Any recommendations would be extremely welcome.

One thing to keep in mind. This polyfill does not test for existing functionality. The intent is that the client will do the test and conditionally load this polyfill to provide backward compatibility.

Cory