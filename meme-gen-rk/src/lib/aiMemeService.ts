export interface AIGeneratedMeme {
  templateId: string;
  topText: string;
  bottomText: string;
  explanation?: string;
}

export interface MemePromptResponse {
  meme: AIGeneratedMeme;
  confidence: number;
  alternatives?: AIGeneratedMeme[];
}

// Mock AI service that generates memes based on prompts
export class MockAIMemeService {
  private static readonly MEME_PATTERNS = [
    {
      keywords: ['work', 'job', 'boss', 'office', 'meeting', 'deadline', 'monday'],
      templates: ['this-is-fine', 'drake', 'distracted-boyfriend'],
      patterns: [
        { top: 'WHEN YOUR BOSS SAYS', bottom: 'JUST ONE MORE TASK' },
        { top: 'MONDAY MORNING', bottom: 'ENERGY LEVELS' },
        { top: 'WORK FROM HOME', bottom: 'VS OFFICE WORK' }
      ]
    },
    {
      keywords: ['cat', 'dog', 'pet', 'animal', 'cute'],
      templates: ['woman-yelling-cat', 'success-kid'],
      patterns: [
        { top: 'WHEN YOUR CAT', bottom: 'IGNORES YOU COMPLETELY' },
        { top: 'DOG OWNERS', bottom: 'VS CAT OWNERS' }
      ]
    },
    {
      keywords: ['food', 'pizza', 'hungry', 'diet', 'cooking'],
      templates: ['drake', 'two-buttons', 'change-my-mind'],
      patterns: [
        { top: 'DIET PLAN', bottom: 'PIZZA DELIVERY' },
        { top: 'COOKING AT HOME', bottom: 'ORDERING TAKEOUT' }
      ]
    },
    {
      keywords: ['study', 'exam', 'school', 'homework', 'procrastination'],
      templates: ['this-is-fine', 'expanding-brain', 'two-buttons'],
      patterns: [
        { top: 'STUDYING FOR EXAMS', bottom: 'WATCHING NETFLIX' },
        { top: 'HOMEWORK DUE TOMORROW', bottom: 'STARTING AT 11 PM' }
      ]
    },
    {
      keywords: ['technology', 'computer', 'internet', 'wifi', 'phone'],
      templates: ['this-is-fine', 'drake', 'change-my-mind'],
      patterns: [
        { top: 'WIFI GOES DOWN', bottom: 'FOR 5 SECONDS' },
        { top: 'NEW PHONE UPDATE', bottom: 'BREAKS EVERYTHING' }
      ]
    },
    {
      keywords: ['relationship', 'dating', 'love', 'girlfriend', 'boyfriend'],
      templates: ['distracted-boyfriend', 'woman-yelling-cat', 'drake'],
      patterns: [
        { top: 'SINGLE LIFE', bottom: 'RELATIONSHIP DRAMA' },
        { top: 'NETFLIX AND CHILL', bottom: 'ACTUAL NETFLIX' }
      ]
    },
    {
      keywords: ['money', 'broke', 'salary', 'expensive', 'shopping'],
      templates: ['this-is-fine', 'two-buttons', 'drake'],
      patterns: [
        { top: 'CHECKING BANK ACCOUNT', bottom: 'AFTER SHOPPING' },
        { top: 'SAVING MONEY', bottom: 'ONLINE SHOPPING' }
      ]
    },
    {
      keywords: ['weather', 'rain', 'hot', 'cold', 'summer', 'winter'],
      templates: ['this-is-fine', 'drake'],
      patterns: [
        { top: 'WEATHER FORECAST', bottom: 'ACTUAL WEATHER' },
        { top: 'SUMMER PLANS', bottom: 'RAINY SEASON' }
      ]
    }
  ];

  private static readonly FALLBACK_PATTERNS = [
    { top: 'WHEN LIFE GIVES YOU', bottom: 'UNEXPECTED SITUATIONS' },
    { top: 'EXPECTATIONS', bottom: 'VS REALITY' },
    { top: 'TRYING TO BE PRODUCTIVE', bottom: 'GETTING DISTRACTED' },
    { top: 'PLANNING AHEAD', bottom: 'LAST MINUTE PANIC' }
  ];

  static async generateMeme(prompt: string): Promise<MemePromptResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const normalizedPrompt = prompt.toLowerCase();
    
    // Find matching pattern based on keywords
    let matchedPattern = this.MEME_PATTERNS.find(pattern =>
      pattern.keywords.some(keyword => normalizedPrompt.includes(keyword))
    );

    // If no pattern matches, use a fallback
    if (!matchedPattern) {
      matchedPattern = {
        keywords: [],
        templates: ['drake', 'this-is-fine', 'two-buttons'],
        patterns: this.FALLBACK_PATTERNS
      };
    }

    // Select random template and pattern
    const template = matchedPattern.templates[Math.floor(Math.random() * matchedPattern.templates.length)];
    const pattern = matchedPattern.patterns[Math.floor(Math.random() * matchedPattern.patterns.length)];

    // Generate contextual text based on prompt
    const generatedMeme = this.generateContextualText(prompt, pattern, template);

    // Generate alternatives
    const alternatives = this.generateAlternatives(prompt, matchedPattern);

    return {
      meme: generatedMeme,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      alternatives: alternatives.slice(0, 2)
    };
  }

  private static generateContextualText(prompt: string, pattern: any, templateId: string): AIGeneratedMeme {
    const words = prompt.toLowerCase().split(' ');
    const keyWords = words.filter(word => word.length > 3);

    let topText = pattern.top;
    let bottomText = pattern.bottom;

    // Try to incorporate user's words into the meme
    if (keyWords.length > 0) {
      const mainKeyword = keyWords[0].toUpperCase();
      
      // Customize based on template type
      switch (templateId) {
        case 'drake':
          topText = `${mainKeyword} PROBLEMS`;
          bottomText = `IGNORING ${mainKeyword} PROBLEMS`;
          break;
        case 'this-is-fine':
          topText = `EVERYTHING WITH ${mainKeyword}`;
          bottomText = `IS TOTALLY FINE`;
          break;
        case 'two-buttons':
          topText = `DEAL WITH ${mainKeyword}`;
          bottomText = `PROCRASTINATE MORE`;
          break;
        case 'change-my-mind':
          topText = `${mainKeyword} IS OVERRATED`;
          bottomText = `CHANGE MY MIND`;
          break;
        default:
          // Use original pattern but try to incorporate keywords
          if (keyWords.length >= 2) {
            topText = `${keyWords[0].toUpperCase()} ${keyWords[1].toUpperCase()}`;
            bottomText = pattern.bottom;
          }
      }
    }

    return {
      templateId,
      topText,
      bottomText,
      explanation: `Generated based on "${prompt}" - focusing on ${templateId.replace('-', ' ')} format`
    };
  }

  private static generateAlternatives(prompt: string, matchedPattern: any): AIGeneratedMeme[] {
    const alternatives: AIGeneratedMeme[] = [];
    
    // Generate 2-3 alternatives with different templates
    const availableTemplates = matchedPattern.templates.filter((_, index) => index > 0);
    
    availableTemplates.forEach((template, index) => {
      if (index < 2) {
        const pattern = matchedPattern.patterns[Math.floor(Math.random() * matchedPattern.patterns.length)];
        alternatives.push(this.generateContextualText(prompt, pattern, template));
      }
    });

    return alternatives;
  }

  static getRandomPromptSuggestions(): string[] {
    return [
      "Monday morning energy",
      "When WiFi goes down",
      "Trying to diet but pizza exists",
      "Procrastinating on important tasks",
      "Weather forecast vs reality",
      "Online shopping vs bank account",
      "Working from home distractions",
      "When your code finally works"
    ];
  }
}