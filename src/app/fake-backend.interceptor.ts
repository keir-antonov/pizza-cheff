import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

export const fakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url === '/api/orders' && req.method === 'POST') {
        const body = req.body as Record<string, unknown>;

        return of(
            new HttpResponse({
                status: 200,
                body: {
                    id: Date.now(),
                    createdAt: new Date().toISOString(),
                    ...body
                }
            })
        ).pipe(delay(600));
    }

    return next(req);
};
