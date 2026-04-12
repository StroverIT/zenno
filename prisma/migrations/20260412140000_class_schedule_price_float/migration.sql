-- Class/schedule list prices: store BGN with fractional precision so EUR form values round-trip for display.
ALTER TABLE "YogaClass" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION USING ("price"::double precision);
ALTER TABLE "ScheduleEntry" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION USING ("price"::double precision);
