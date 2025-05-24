
# swarm-intelligence

0:00
Hi everyone! Today I’m going to show  
0:08
you my experiment on using swarm intelligence. I’ve called the project "Screaming Insects".
0:14
I’d like to note that the exact definition of  swarm intelligence is still not formulated.
0:19
Let's open Wikipedia and read the definition:
0:23
The agents follow simple rules, and although there  is no centralized control structure dictating how  
0:30
individual agents should behave, local, and to  a certain degree random, interactions between  
0:37
such agents lead to the emergence of "intelligent"  global behavior, unknown to the individual agents
0:45
By intelligence here, we mean not that  a swarm of agents will begin to raise  
0:51
philosophical questions, but the fact that they  will jointly solve a problem, the solution of  
0:57
which is not obvious from a simple algorithm of  the agent, but is revealed in their joint actions.
1:05
Well, here’s today's task  for the "Screaming Insects":  
1:09
to look for resources and  deliver them to the base.
1:14
On the right side of the screen, you see what  we're going to have at the end of the video. 
1:19
The agents are looking for resources  and deliver them to the base. 
1:24
The agent's algorithm is very simple; the agent is  blind, walks crookedly, and can only contact the  
1:32
nearest agents, but acting together, they quickly  find a resource and a short path to the base.
1:40
The topic is very interesting. Researchers  are trying different approaches. 
1:46
In my opinion, this will become widespread when  the agents are located on different physical  
1:52
devices and there will be a problem  in creating a centralized management.
2:00
Let’s get back to the "Screaming Insects" project.
2:06
This is our agent. He has a direction, and his  task is to run between point A and point B. 
2:12
Now he needs to find point A. Since there are only 2 points,  
2:17
the agent has 2 counters, in which the estimated  number of steps to each point is recorded.
2:23
With each turn, these counters increase by one,  no matter which direction the agent is going. 
2:29
And with every turn, he shouts out the  value of one of his counters plus 50. 
2:35
50 is the maximum distance at  which his scream can be heard. 
2:38
He sort of notifies everyone who hears him  that there is the same number of steps to this  
2:45
point as for him, plus an additional 50 steps. The agent doesn’t see anything, moves by touch,  
2:51
and must bump into an item to understand  that he has arrived at his destination. 
2:56
Here, the Agent has bumped into one  of the items, perhaps by accident. 
3:03
He is resetting the counter  corresponding to this item. 
3:07
If this is exactly the item that he has been  looking for, he will turn 180 degrees and continue  
3:14
to move on. Now he needs to find point B. And here is where the magic happens. 
3:19
He is heard by the second agent  located within a radius of 50 steps. 
3:25
The second agent compares the value he  hears with the value from his counter. 
3:29
If the values ​​heard are less, the second agent  updates his counter corresponding to point A, that  
3:36
is, he writes down the value that he has heard. Now he believes that there are 51 steps from  
3:42
him to point A. 50 steps to the  
3:44
first agent and one more step to point A. If the second agent was moving to point A,  
3:50
then he would turn in the direction of the  shouting, but now he is going to point B. 
3:55
Now the second agent notifies the others  that they are 101 steps from point A. 
4:01
That is, 50 steps to reach it, and  from there to point A – 51 steps. 
4:08
This was heard by the third agent. He updates  his counter, and as he is going to point A,  
4:13
he turns in the direction of shouting. Please note that the direction of the third  
4:19
agent has become even worse than before. This will often happen locally. 
4:24
But globally, abstract swarm intelligence will  see the whole picture through the gradient of  
4:30
counter values ​​for agents, and as a result,  all agents will reach their destination.
4:36
So, here’s the Agent’s algorithm: Take a step and increase all the counters by one. 
4:42
If you bump into one of the items,  reset the respective counter. 
4:46
If this is the destination you were willing  to reach, turn around 180 degrees and  
4:52
change the destination objective in your head. Shout out the value of one of your counters plus  
4:59
the maximum distance you can be heard at. Listen to what the others are shouting. 
5:04
If you have heard a value less than in  your counter, update the respective counter 
5:10
and turn in the direction of the  shouting if you need to reach this place.
5:17
First implementation 
5:21
Here, the agent must shuttle  between the two bases. 
5:25
The operation principle is slightly  different from what I have described before,  
5:30
but the picture has turned out to be  interesting, so I will show it here. 
5:34
There are 1600 agents on the field, and a shout  out can be heard at a distance of 38 pixels. 
5:42
To understand the scale, I will  put a ruler with a scale of 38  
5:46
pixels and circles with the same radius. Lines will be displayed on the screen,  
5:51
connecting the one who shouts  and the one who is listening,  
5:55
provided that the shouting  has led to counter update.
5:58
The main difference is that the agent only  shouts out when one of his counters is updated,  
6:04
so the initialization of the shout  wave comes from one of the bases. 
6:09
And then the wave passes where the  distance between the agents allows. 
6:14
After some time, something  like paths begin to form. 
6:20
I'm starting the video.
6:21
Most of the time, agents walk in silence,  
6:25
but even such uncommunicative agents  have managed to build a path in the end. 
6:30
Critically important here is the number of agents  per unit area and also the range of the shout out. 
6:37
Reducing the distance even by one pixel leads to  the fact that the path is created much longer. 
6:44
Now I've sped up the playback for you to see that  over time, the path tends to become straight. 
6:50
Also, the system has a feature that is a  direct consequence of the operation principles:  
6:55
in the presence of two paths, the  longer path dies off immediately.
7:01
In the end, I have come to the  conclusion that with each turn,  
7:04
agents should report the state  of one of their counters.
7:11
Now I will show you some interesting points  that I have pointed out during the experiments. 
7:17
We have two blue bases on the right side  and orange resources on the left side. 
7:22
Let’s launch the agents. The agents have found all  
7:27
the targets, but look what happens. The central resource is closer to the  
7:31
bases than other resources, and therefore, the  agents prefer to go only to where it’s located. 
7:37
And the central resource is closer to  the higher base, so the agents prefer  
7:43
to carry the resource to this base. This is exactly the feature I was  
7:48
talking about: long paths die off quickly. Sometimes it's helpful, sometimes it's harmful. 
7:55
For example, in the final implementation,  each agent is assigned exactly which of  
8:02
the resources he should bring so that he  is not distracted by the nearest ones.
8:07
And one more thing. The path has been  formed. I put the resource next to the path,  
8:13
but since the agents are blind, they will walk by. 
8:18
Therefore, in the final version, some  of the agents are scouts who do not  
8:22
deliver the resource, but simply survey the  surroundings and help transmit messages. 
8:30

And here’s one more trick. The resource has disappeared,  
8:34
and now the agents begin to move in a wide  fanю This helps to find the resource faster. 
8:41
And this happens because after each step,  
8:44
they randomly change direction by a  small angle. They cannot walk straight. 
8:51
See what would happen if  they could walk straight.
 
8:59
And the last moment here: the agents  should not only walk crookedly,  
9:03
but they should also have different speeds. 
9:06
If you set the same speed for everyone,  the path often gets destroyed,  
9:11
turning into a group that roams to one  point and then all together to another.
9:16
It seems that we have mentioned all the points,  
9:20
and now we are moving on to the final  implementation of the “Screaming Insects” project.
9:28
So, the Legend goes as follows: There are three types of resources:  
9:34
red, green, and blue. These are agents going  
9:38
after a red, green, and blue resource. And this is how they look like when  
9:44
they have grabbed the resource and  are carrying it back to the Queen. 
9:48
Also, among the agents, there are scouts who move  
9:52
around the area and don’t have a  particular goal to find resources. 
9:57
But if they bump into a resource,  they carry it to the Queen. 
10:02
And this is the Queen; the circle in  the center shows her health state.
10:08
Let’s go.
10:10
To challenge it a bit, resources  are constantly moving, moreover,  
10:15
the Queen herself is constantly on the move,  shifting towards the furthest resource.
10:22
The agents have a lifespan,  and eventually, they will die. 
10:26
But the Queen, if all the three resources  are brought to her, can create a new agent. 
10:32
Or, with some probability, she can spend  the resource on extending her life. 
10:38
Besides, any agent, being 1000 steps from  the Queen, can declare himself the Queen, 
10:45
start shouting around the district  that the Queen is only 50 steps away,  
10:50
take resources from the approaching  agents, and create new ones. 
10:54
On the screen, you can already  see how new Queens are appearing.
11:00
By the way, the agents don’t  care about whose Queen it is,  
11:04
and carry resources to where it is closer.
11:07
Newly emerged Queens need to quickly get all the  
11:11
three resources to have enough  time to prolong their lives. 
11:15
It all depends on good luck. It is necessary to  be close to resources and have many agents nearby.
11:23
Resources are of a fairly small capacity, a swarm  of agents devastates them in just a few seconds. 
11:31
Few resources manage to get away if  they are discovered by the swarm.  
11:36
The only salvation is if the same resources are  located nearby and the agents switch to them.
11:44
Well, next I’ll share my fantasies.
11:47
There are caravans, so you need to learn how  to rob them and take the prey to your Queen.
11:53
Or we can create an economic simulation. Each  Queen sets her own price for each resource. 
12:00
The agent must decide whether to carry them close,  but be paid cheap, or move them far, but for a  
12:08
high price, although facing a risk to be robbed. And all this to save up to buy a house and retire
12:15
Speaking of construction. I would like agents to not only carry resources,  
12:20
but also to engage in construction. I found an algorithm online showing  
12:25
how termites build their termite mounds. Guided by this algorithm, thousands of unorganized  
12:32
insects build a complex multi-tiered maze as  a result. They have no plans, no blueprints.
12:39
But I still couldn't understand it. Perhaps you have some ideas  
12:44
on how to implement this. Please leave your comments.
12:49
Thanks to everyone who supports us on patreon. More support, more opportunities for new projects.
12:57
Well, that's all for now, bye everyone!
