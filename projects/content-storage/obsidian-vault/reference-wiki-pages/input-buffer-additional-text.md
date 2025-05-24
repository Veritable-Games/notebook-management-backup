
# input-buffer-additional-text
all of this text aside, it is said that the new input system makes this redundant. 'input events', 'traces'

"I think it's best used in situation like grid based movement. Normally the movement is blocked when player already move let say one direction. So if the player press up and left quickly, the character will only move up since the left input is blocked by the up movement.

Using input buffer, the left movement can be applied immediately after the up movement is done even if the player has already release the input at that time."

"I have written a lot of grid based movements, never needed an input buffer!

If the players moves up and then left, by the time the player has hit left, there probably would have ben 10 frames that have run!

But the issue with your example is that both inputs are thrown into a buffer and then executed when they need to, when the code reads ands runs what is in the buffer, that means more frames would have passed. But that also means that the movement up and left actions would have still run on different frames.

In other words, the buffer in that example runs code for no reason.

The New Input System, when is read via events is exactly the same thing as a buffer, the difference is you are not writing code to pull it out and execute, Unity is doing that for you.

Input Buffers may have been good on systems 30 years ago, but on todays computers, there is no real good need for one. I am open to be convinced, but in my time in the industry, I have not seen a need where you would need to do it."

"So, I've got a fighting game with some pretty tight input windows, and I'd like to buffer the inputs for a few frames.

Basically, if the fighter is in the neutral state, pressing attack should lead into an attack. It uses Input.GetButtonDown("attack") to get the button, and if it detects a press, transitions into attacking state. Now, let's suppose the fighter has just landed, and ends up hitting "attack" a few frames before the land animation ends and he transitions back into neutral. As of right now, nothing would happen, since he's not in the neutral state where the check is, and when he enters the state, the button press is no longer happening.

Is there a way to store inputs for a few frames, so that I can read a button press a few frames back? So, instead of using Input.GetButtonDown("attack"), it'd be something like InputBuffer.KeyBuffered("attack",12) to see if the button was pressed within 12 frames?

The example above is just a bit of a simplification, I know for the above situation I could just use GetButton instead of GetButtonDown, but for a fighting game, you can imagine that the necessary inputs to buffer would get significantly more complicated.

	unityc#inputfighting-game

Share
Follow
edited Jun 28, 2022 at 21:14
DMGregory's user avatar
DMGregory♦
136k2222 gold badges245245 silver badges367367 bronze badges
asked Jan 28, 2017 at 23:48
digiholic's user avatar
digiholic
14111 silver badge66 bronze badges

	It sounds to me like your design should be altered slightly to track manually whether or not a button was pressed; i.e. check 12 frames back if the button was pressed, or rather store all buttons that were pressed manually in the window that the input would be allowed. Sorry if I'm not understanding the question – 
	James Hurley
	Commented Jan 29, 2017 at 0:17 

	1
	Yes, you have the means to write an InputBuffer yourself that does exactly what you describe. It would use the typical Input.GetButtonDown() etc. to detect presses, then store them in a format that preserves what you need (eg. a frame ID for each button's last press, or a ring buffer of the last n presses, or...). There's not much trick to it other than configuring Unity's script execution order to ensure it runs first (so you don't have scripts querying it & getting inconsistent inputs at different moments in the frame). Do you need any particular help in implementing this? – 
	DMGregory
	♦
	Commented Jan 29, 2017 at 0:50

Add a comment
1 Answer
Sorted by:
2

As suggested in the comments, you can buffer frame inputs for when you're ready to process them. In your update method:

if (attacking && Input.GetButtonDown("attack"))
{
	queue.Enqueue(InputEnum.Attack);
}

When the time comes for you to act on the input, you can simply pop from the queue and proceed according to what you find. This assumes that you care about every input (and the order in which they arrived). If you only need to consider the first input made during the attack, you don't even need a queue/buffer."
