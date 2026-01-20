
import { Injectable } from '@angular/core';
import { Agent } from '../../model/agent';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private agent: Agent|null = null;
  private baseUrl = 'http://localhost:8080/agents'; // Adjust this URL if needed

  constructor(private http: HttpClient) {}

  // GET /agents
  getAllAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.baseUrl);
  }

  // GET /agents/{id}
  getAgentById(id: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.baseUrl}/${id}`);
  }

  // POST /agents
  createAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.baseUrl, agent);
  }

  // PUT /agents/{id}
  updateAgent(id: number, agent: Agent): Observable<Agent> {
    return this.http.put<Agent>(`${this.baseUrl}/${id}`, agent);
  }

  // DELETE /agents/{id}
  deleteAgent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

   // GET /agents/by-username/{username}
  getAgentByUsername(username: string): Observable<Agent> {
    return this.http.get<Agent>(`${this.baseUrl}/username/${username}`);
  }

  setAgent(agent: Agent): void {
    this.agent = agent;
  }

  getAgent(): Agent | null {
    return this.agent;
  }
}
