# raytracing-2d


These files create a point source of rays located in a field with five randomly placed walls. 
Rays are emitted from the point source and terminate when they intersect one of the walls or the sides of the screen.
Additionally, the rays are emitted from the point source within a field-of-view with a set angle which can be adjusted using a slider below the window.
The point source can be controlled using the four arrow keys to rotate and move throughout the environment. On the second half of the screen, 
a 3D representation of the particle's perspective of the field-of-view is produced and continually updated as the particle moves. 
Finally, when the field-of-view is extended to large values, a fisheye effect is observed, but when the mouse is clicked, the corrected geometry is displayed 
in the right hand window.

How to install and run:
1. Clone the repo onto your local computer
2. Run the .html file in a web engine (I used Google Chrome)

### Field of View Visualization
![Field of View Visualization](field_of_view.gif)
