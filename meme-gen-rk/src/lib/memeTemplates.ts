export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export const memeTemplates: MemeTemplate[] = [
  {
    id: 'drake',
    name: 'Drake Pointing',
    url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    width: 400,
    height: 400,
  },
  {
    id: 'woman-yelling-cat',
    name: 'Woman Yelling at Cat',
    url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    width: 600,
    height: 400,
  },
  {
    id: 'this-is-fine',
    name: 'This is Fine',
    url: 'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    width: 600,
    height: 400,
  },
  {
    id: 'change-my-mind',
    name: 'Change My Mind',
    url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    width: 600,
    height: 400,
  },
  {
    id: 'expanding-brain',
    name: 'Expanding Brain',
    url: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600&h=600',
    width: 600,
    height: 600,
  },
  {
    id: 'two-buttons',
    name: 'Two Buttons',
    url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    width: 600,
    height: 400,
  },
  {
    id: 'success-kid',
    name: 'Success Kid',
    url: 'https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    width: 400,
    height: 400,
  },
];