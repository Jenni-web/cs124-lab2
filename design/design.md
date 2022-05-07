# Design Document
## Design Decisions
1. Add task at the top.
   - The text box to add tasks/items is near the top of the screen, 
   just after the header. The reason is because we noticed that a lot of the
   existing apps tend to have typing box near the top and not at the bottom.
   The only exception that we can think of is Safari, which had an update while 
   ago and now has the search box at the bottom (at least on Aoi's iphone). 
   It feels very weird to have it there - not following the convention.
   To not confuse users, we decided to put the text box at the top,
   following the convention of other apps.

2. New tasks are added to the bottom of list.
   - When a new task is added, it appears at the bottom of the list instead of top,
   middle, or something random. When we write out a list on paper, people usually
   write from top to bottom. Therefore, we decided that it would be easier for users
   if our list also added new items in the same manner - top to bottom. It
   is also better in terms of organizing tasks because the older task would be near the
   top, which is where most people focus their attention (we noticed that we tend to look the upper half of
   screen and not so much near the bottom). 
   
3. List separated by borders.
   - Lists are separated by borders so that the users can easily distinguish tasks.

4. Hide, Delete, and Sort buttons at the bottom.
    - Hide and Delete buttons are located at the bottom of the screen. From the analysis
   of other apps for mobile, we noticed that control panels are often located at the bottom
   of screen. We decided to follow the convention of other apps and place the two
   buttons at the bottom. Since the two buttons have different functions, we made the buttons 
   big and easily distinguishable.
    - Sort button is also located at the bottom of the screen along with two other buttons. 
	 Users can sort the current tasks by one of the following rules: name, creation date, or priority. They can switch between different sorting rule by clicking the button. The text shown is the current sorting rule which by default is creation date.   

5. Colors mainly blue.
   - We made the colors mainly blue. It is mostly an aesthetic choice but also cool colors are 
     associated with calming and healing. We decided that we want to make our app calming, because
     having a todo list and seeing it with active colors may be a little stressful.
     
6. Completed tasks strike-through.
   - Tasks are marked completed by having a strike-through. The strike-through was added so that 
     it is very visible that a task is done, and it is one of the conventions a lot of people use:
     mark a task complete by putting a line across.

7. Tasks can have three different priorities.
   - Users can set priority of tasks, either to "High Priority", "Medium Priority", or "Low Priority",
     by the button at the left of each task. The default is "High Priority" because we believe that
     the tasks that make it into todo list tend to have high priority (if it is not, both of us would not 
     bother to put it in the list from the start). As the priority gets higher, the color of the button gets
     darker, since it is hard to distinguish the difference between each priority with just text. Colors
     are chosen to fit the general theme of the app.

8. Before adding at least 1 task, user is not allowed to do anything related to tasks.

9. List-related functions live in the sidebar, task-related functions live in the main screen.
   - Anything related to lists (adding, deleteing, selecting lists) live in the sidebar which can be opened by
		 clicking on the list icon in the upper-right corner. Task related functions (adding, marking as complete, setting priority,
 hiding, deleteing, sorting) live in the main screen.

10. Users can add, delete, select, and rename lists.
		Users are able to perform the above functions by opening the sidebar.

11. When adding and deleting lists, pop ups are used to disable any other functions and also for saving space.
	  Since list-related functions are all in the sidebar, we decided it was better to create a seperate popup than to
    create more buttons within. 

12. For users with no mouse, we changed the outline color to red so that there is a better visiual cue.

13. Icons are used where appropriate for better visiual cues and to conserve space. 

14. After signing up with email & password, user is asked to verify their email before moving onto the SignedInApp. They will be automatically signed out after verification email is sent. They will not be able to even see the SignedInApp if their email is not verified.

15. Email of the currently signed in user is displayed at the top, right after "TO DO LIST".

16. Sign out button is located at the top, right after current user's email.

17. Only the owner of the list is allowed to: share a list with others, stop share, rename a list, and delete a list. All these operations are disabled for shared users. 

18. Lists that the user own and the lists that are shared have distinguishable UI, since 
lete button and share button does not appear for shared list.
## Alternative Designs
   - We had three options for our color scheme: orange and blue. orange was our warm color.
     opt ion and blue was our cool color option. Warm color is more likely to motivate the
     users to complete the tasks (some of the todo apps we have used in the past used warm color), 
     while cool colors is more likely to make the users feel relaxed and not stress about the tasks. 
     After comparing the two colors, we decided to move on with the cool color.  
   - When choosing where to put the Sort button, we had two options: to put it above the Add Task section 
     (just below the header) or with the Hide & Delete button. After some discussions, we concluded that it is 
     better to have the Sort button with Hide & Delete button, because then the control buttons would all be located
     near the bottom and not everywhere on the screen. One concern is that user may accidently click on a button
     when they actually wanted to perform other actions. To address this concern, we made the buttons use
     full width of the screen.

## Challenges
   - One challenge in lab 5 wwas the design of displaying share-list related things: add share, stop share, view current share, etc. We decided to make another button besides delete list button for each list and make a popup. We moved on with decision because we did not want to add more things to the actual main page. By making it a popup, we are able to show all necessary things without affecting any other components from previous labs.e
   - The biggest challenge we had was making the Hide, Delete, and Sort button stick to the
     end of page and also not overlap with tasks when the list grew long. We were running into troubles 
     where buttons would not be sized right (even when set the width & height), moving as the list grows, 
     or overlapping with the list. We now do have the buttons at the bottom even if items are added or deleted. Also, by making the task list go into a seperate div, we were able to successfully separate the buttons and list so that even if the tasks overflow from the screen, they will not overlap with the buttons and instead become scrollable.
   - It was challenging for us to choose a color. Since it is a todo list, we want to encourage the 
     users to finish the tasks but also not stress them. We tried different colors, both warm and 
     cool colors, and in the end decided that we want to focus on not making the users stressed (if 
     they are putting it in a todo list, it is more likely that they are already motivated to do the
     tasks.)
     
## Good Design
   - We think our design for adding tasks is clean and simple. For some existing todo apps, users 
     need to scroll down to the bottom of list to add a task. Instead of following that convention,
     we decided to create a text box at the top where users can add tasks. This way, steps for adding 
     a task is always consistent for users (no need to scroll different length depending on how long the
     existing list is): just type in the text box and hit add (new task automatically placed ath the end
     of list). 
   - Our buttons for setting priority and sorting only requires the users to tap on it until they reach the option they want. Also, because each button is correctly labeled with text indicating what it is for ("__ Priority", "Sort By: _____"), we think it is quite simple and easy to figure out.
   - Our login & register page is very neat and easy to switch between login and register using tabs.
   - The lists that user own and the lists that are shared are clearly distinguishable. Also, because buttons for deleteing and sharing lists are non-existent for lists that are shared to them, there is no confusion in what the users are able to do.

## Videos
   [With keyboard video](https://www.youtube.com/watch?v=_Q1dLTb9JSc)   
   
   [With screen reader video](https://youtu.be/zAsuGjl1ZJY)
## Notes
   - There has been some challenges with styling due to the package that we are using for sidebar. Since it came with predefined html and css, some of the parts we were not able to override thus had to adjust our design to fit the package.
