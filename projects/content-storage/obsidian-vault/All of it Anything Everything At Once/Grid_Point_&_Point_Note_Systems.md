
# Grid Point & Point Note Systems
Grid-Point & Point-Note Systems

Veritable Games
Last Updated: 03/12/2023
The Note System:
A feature that allows players to attach text notes to objects in the game world. To create a new note chain, the player selects an object and presses a hotkey. Notes can be added to the chain by clicking on a UI element and typing in text. The player can also edit the text of a note, delete a note, or link a note to another note or object by clicking and dragging a connection line between them. Navigation through note chains in the UI is enabled by using a scrollbar. The notes have an auto-index system, a dictionary, and can be categorized and labeled for easy reference. The Note System enables players to gather notes all over the game world, keeping visible track of everything while exploring freely. [this and the next description are effectively the same]
The Point Note System: 
Allows the user to attach ‘notes’ to objects in the game world and create connections between them using UI point-lines. The system features an auto-indexing dictionary, making it easy to manage notes and navigate between them using a scrollbar. The UI provides functionality for creating, editing, and deleting notes, as well as linking them to other notes or objects. The Point Note System could be a system for managing notes that are associated with specific points in the game world. The user can gather notes all over the scene and keep visible track of everything by creating point-lines that relate to the notes attached to objects. Link notes to objects in the game world through UI point-lines, allowing for easier in-world navigation and organization of notes. Clicking on an object creates a line from the UI-written note to the object, and selecting an item highlights it and brings up the inherent note component.
The Grid Point System: 
The Grid Point System is used in conjunction with the Point Note System to provide a way to define points in 3D space using a grid system. This helps to eliminate floating point errors and provides a more precise way of positioning objects in the game world. The Grid Point System could be used for positioning and snapping objects, or creating a structured environment. It is an additional feature that works around floating point limitations in Unity by dividing the game world into a grid and attaching notes to grid points rather than specific objects.
Controls & Functionalities:
Selecting an object in the scene and pressing a hotkey to create a new note chain. This means that when the user selects an object in the scene and presses a hotkey, a new note chain is created. A note chain is a collection of notes that are associated with the selected object.

Adding a note to a chain by clicking on a UI element and typing in text. Once a note chain is created, the user can add notes to it by clicking on a UI element and typing in text.

Editing the text of a note by selecting it in the UI and typing in new text. The user can edit the text of a note by selecting it in the UI and typing in new text.

Deleting a note by selecting it in the UI and clicking a delete button. The user can delete a note by selecting it in the UI and clicking a delete button.

Linking a note to another note or object by clicking and dragging a connection line between them. The user can link a note to another note or object by clicking and dragging a connection line between them. The connection line is a UI point-line that relates to the notes or objects in the game world. This helps the user keep track of the relationships between notes and objects.

Navigating through note chains in the UI using a scrollbar. The user can navigate through note chains in the UI using a scrollbar.

Clicking on an object creates a line from the UI-written note to the object in 3D space. When the user clicks on an object, a line is created that connects the UI-written note to the object in the 3D space of the game world.

Selecting an item highlights it and brings up the inherent note component for that item. When the user selects an item, it is highlighted and the inherent note component for that item is displayed.

The user can use the scroll wheel in the UI to navigate through the notes that are displayed.

The user can delete notes from the list and thus remove point lines. The user can delete a note from the list, and the point line that relates to that note is also removed.

The notes have an auto-index system and a dictionary that interrelate to make the system work. Notes are automatically indexed and can be accessed through the dictionary. They are interrelated to enable the user to keep track of their relationships with objects.

The Point Note System allows for the use of labels and categories for the notes. The user can label notes and organize them into categories to make it easier to keep track of them.
The System’s Script Progress:
	* ConnectionLine: This script draws a line between two notes to represent a connection. It uses Unity's LineRenderer component to draw the line and calculates the positions of the start and end points of the line based on the positions of the note UI items.
	* CreateNewNoteChain:

	* CustomGrid:

	* Cursor: Provides functions to control the appearance and behavior of the cursor in the game. It allows you to show or hide the cursor, lock or unlock its position, and set a custom cursor image.
	* GridPoint: This script represents a single grid point in the game world. It stores the position of the grid point as a Vector3.
	* GridPointSystem: This script provides a system for managing a grid of points in the game world. It allows you to create and delete grid points, snap notes to the nearest grid point, and adjust the size and spacing of the grid.
	* GridSnapping: This script provides functions for snapping notes to the nearest grid point. It works in conjunction with the (GPS) to calculate the nearest grid point and move the note to that position.
	* GridUtils:

	* Label: This script represents a label object in the game world. It stores the text content of the label and its position in the game world.
	* Note: This script represents a single note object in the game world. It stores the text content of the note, its position in the game world, and a unique ID that can be used to identify the note.

	* NoteButton: This script is responsible for handling user input on a note UI item. When the user clicks on the UI item, this script creates a new note object and adds it to the game world at the position of the selected object.
	* NoteComponent: This script provides a base class for other note-related components in the game. It provides some common functionality, such as the ability to save and load note data.
	* NoteData: This script represents the data for a single note. It stores the text content of the note and its position in the game world as a Vector3.
	* NoteDetailWindow: This script is responsible for displaying the details of a single note in a popup window. It shows the text content of the note, allows the user to edit it, and provides buttons for deleting or saving the note.
	* NoteDictionary: This script provides a centralized location to store all note objects and their associated data. It allows you to add, remove, and look up notes by their unique IDs.
	* NoteDisplay:
	* NoteIndexItem: This script represents a single item in the notes index UI. It displays the text content of the note and provides a button for opening the note details window.
	* NotesIndexWindow: This script is responsible for displaying the notes index UI. It shows a list of all the notes in the scene, creates an index of all the notes, and allows the user to open their details windows.
	* NoteManager: This script is responsible for managing all note-related functionality in the game. It creates, updates, and deletes notes as necessary, and ensures that all other scripts have access to the current state of the note system.
	* LookWithMouse: This script controls the behavior of the camera when receiving mouse input.
	* NoteDisplay: This script is responsible for displaying the text content of a note on the game world. It uses Unity's TextMesh component to render the text in 3D space.
	* NoteManager: This script manages the creation, deletion, and updating of notes in the game. It also handles the saving and loading of notes to and from a file.
	* SnapToGrid: This script provides functionality for snapping notes to a grid. It allows you to define the size of the grid and snap notes to it when they are moved or resized.
