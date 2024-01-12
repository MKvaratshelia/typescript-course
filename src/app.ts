import { PromptService } from './core/prompt/prompt.service';

class App {
    async run() {
        const result = await new PromptService().input<number>('Number', 'number');
        console.log(result);
    }
}

const app = new App();
app.run();
