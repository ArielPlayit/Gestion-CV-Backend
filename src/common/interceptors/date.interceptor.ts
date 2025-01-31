import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DateFormatInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                return this.formatDates(data);
            }),
        );
    }

    private formatDates(data: any): any {
        if (!data || typeof data !== 'object') return data;

        if (data instanceof Date) {
            return data.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        }

        if (Array.isArray(data)) {
            return data.map(item => this.formatDates(item));
        }

        for (const key of Object.keys(data)) {
            data[key] = this.formatDates(data[key]);
        }

        return data;
    }
}
