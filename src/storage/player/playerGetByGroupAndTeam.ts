import { playersGetByGroup } from "./playersGetByGroup";

export async function playersGetByGroupAndTeam(group: string, team: string){
  try {
    const storage = await playersGetByGroup(group);
    
    const players = await storage.filter(player => player.team === team);

  }catch(error){
    throw error;
  }
}