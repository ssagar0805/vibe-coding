"""
This script contains the core logic for calculating the NudgePal buddy's mood.
It is designed to be a simple, standalone demonstration of the app's central engine.
"""

def calculate_buddy_mood(tasks):
    """
    Calculates the buddy's mood based on the completion rate of tasks.

    Args:
        tasks (list): A list of task dictionaries. Each dictionary should have
                      a 'completed' key with a boolean value.

    Returns:
        str: The calculated mood ('happy', 'neutral', or 'sad').
             Returns 'neutral' if there are no tasks, as there's nothing to be sad about.
    """
    if not tasks:
        return 'neutral'

    # Count how many tasks have been marked as completed.
    completed_count = sum(1 for task in tasks if task.get('completed', False))

    # Calculate the completion rate.
    completion_rate = completed_count / len(tasks)

    # Determine the mood based on the completion rate.
    if completion_rate > 0.75:
        return 'happy'  # User has completed more than 75% of tasks.
    elif completion_rate >= 0.25:
        return 'neutral' # User has completed between 25% and 75% of tasks.
    else:
        return 'sad'      # User has completed less than 25% of tasks.

# --- Demonstration ---
if __name__ == "__main__":
    # This section demonstrates the function with different scenarios.

    # Scenario 1: User is doing great (>75% completion)
    happy_tasks = [
        {'name': 'Drink water', 'completed': True},
        {'name': 'Stretch', 'completed': True},
        {'name': 'Read a chapter', 'completed': True},
        {'name': 'Call mom', 'completed': True},
    ]  # 4/4 = 100%

    # Scenario 2: User is on track (25% - 75% completion)
    neutral_tasks_1 = [
        {'name': 'Drink water', 'completed': True},
        {'name': 'Stretch', 'completed': True},
        {'name': 'Read a chapter', 'completed': False},
        {'name': 'Call mom', 'completed': False},
    ]  # 2/4 = 50%

    neutral_tasks_2 = [
        {'name': 'Drink water', 'completed': True},
        {'name': 'Stretch', 'completed': False},
        {'name': 'Read a chapter', 'completed': False},
        {'name': 'Call mom', 'completed': False},
    ]  # 1/4 = 25%

    # Scenario 3: User needs a nudge (<25% completion)
    sad_tasks = [
        {'name': 'Drink water', 'completed': True},
        {'name': 'Stretch', 'completed': False},
        {'name': 'Read a chapter', 'completed': False},
        {'name': 'Call mom', 'completed': False},
        {'name': 'Take vitamins', 'completed': False},
    ]  # 1/5 = 20%

    # Scenario 4: No tasks for the day
    no_tasks = []

    print("--- NudgePal Buddy Mood Calculator ---")
    print(f"Scenario: 4/4 tasks completed. Mood: {calculate_buddy_mood(happy_tasks)}")
    print(f"Scenario: 2/4 tasks completed. Mood: {calculate_buddy_mood(neutral_tasks_1)}")
    print(f"Scenario: 1/4 tasks completed. Mood: {calculate_buddy_mood(neutral_tasks_2)}")
    print(f"Scenario: 1/5 tasks completed. Mood: {calculate_buddy_mood(sad_tasks)}")
    print(f"Scenario: No tasks today.      Mood: {calculate_buddy_mood(no_tasks)}")
